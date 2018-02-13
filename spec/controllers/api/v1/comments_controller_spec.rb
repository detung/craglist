require "rails_helper"

RSpec.describe Api::V1::CommentsController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:climb1) { FactoryBot.create(:climb) }
  let!(:comment) { FactoryBot.create(:comment, user: user, climb: climb1) }
  let!(:todo) { FactoryBot.create(:to_do, user: user, climb: climb1) }

  before(:each) do
    sign_in user
  end

  describe "PATCH#update" do
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

  describe "PATCH #completed" do
    let(:update) {
      {
        commentId: comment.id,
        climbId: climb1.id,
        comment: {
          body: "This is a completed climb comment"
        }
      }
    }

    it "updates the Comment body and changes the To Do status enum to completed" do
      patch(:completed, params: update)

      updated_comment = Comment.find(comment.id)
      completed_todo = ToDo.find_by(user: user, climb: climb1)

      expect(updated_comment.body).to eq("This is a completed climb comment")
      expect(completed_todo.completed?).to eq(true)
    end
  end
end
