class Climb < ApplicationRecord
  validates :name, :location, :grade, :type, :pitches, presence: true
  validates :description, :comment, length: { maximum: 5000 }

  belongs_to :tick
  belongs_to :project
  belongs_to :to_do
end
