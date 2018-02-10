class Climb < ApplicationRecord
  validates :name, :location, :grade, :discipline, :pitches, presence: true
  validates :description, :comment, length: { maximum: 5000 }

  has_many :to_dos
  has_many :users, through: :to_dos
end
