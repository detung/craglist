class Tick < ApplicationRecord
  belongs_to :user

  has_many :climbs
end
