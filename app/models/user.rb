class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :to_dos
  has_many :climbs, through: :to_dos

  def climbs_to_do
    todo = []
    ToDo.where(status: "pending").each do |item|
      todo << item.climb
    end
    todo
  end

  def climbs_completed
    completed = []
    ToDo.where(status: "completed").each do |item|
      completed << item.climb
    end
    completed
  end
end
