class Climb < ApplicationRecord
  validates :name, :location, :grade, :discipline, :pitches, presence: true
  validates :description, :comment, length: { maximum: 5000 }

  belongs_to :tick, optional: true
  belongs_to :to_do, optional: true
end
