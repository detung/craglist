class Comment < ApplicationRecord
  validates :body, length: { maximum: 5000 }
  
  belongs_to :user
  belongs_to :climb
end
