require "rails_helper"

RSpec.describe Api::V1::CommentsController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:climb1) { FactoryBot.create(:climb) }

  before(:each) do
    sign_in user
  end

  describe "PATCH#update" do
    let(:comment) { FactoryBot.create(:comment, user: user, climb: climb1) }
    let(:update) {
      {
        id: comment.id,
        comment: {
          body: "This is an updated comment"
        }
      }
    }

    it "updates the Comment body attribute" do
      patch(:update, params: update)

      updated_comment = Comment.find(comment.id)

      expect(response.status).to eq(200)
      expect(updated_comment.body).to eq("This is an updated comment")
    end
  end
end
