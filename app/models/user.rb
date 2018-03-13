class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

  has_many :to_dos
  has_many :climbs, through: :to_dos
  has_many :comments

  def climbs_to_do
    todo = []
    ToDo.where(user: self, status: "pending").each do |item|
      todo << get_climb_hash(item)
    end
    todo
  end

  def climbs_completed
    completed = []
    ToDo.where(user: self, status: "completed").each do |item|
      climb_hash = get_climb_hash(item)
      climb_hash[:completed_date] = item.completed_date
      completed << climb_hash
    end
    completed
  end

  def get_climb_hash(to_do_object)
    climb_object = to_do_object.climb
    climb_hash = {}
    climb_hash[:climb] = climb_object
    climb_hash[:comment] = Comment.find_by(user: self, climb: climb_object)
    if climb_hash[:comment].nil?
      climb_hash[:comment] = ""
    end
    climb_hash
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
    end
  end
end
