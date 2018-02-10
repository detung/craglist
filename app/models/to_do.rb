class ToDo < ApplicationRecord
  belongs_to :user
  belongs_to :climb
  enum status: [:pending, :completed]
end
