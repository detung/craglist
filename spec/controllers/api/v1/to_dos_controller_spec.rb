require "rails_helper"

RSpec.describe Api::V1::ToDosController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:climb1) { FactoryBot.create(:climb) }

  before(:each) do
    sign_in user
  end

  describe "DELETE #destroy" do
    let!(:todo) { FactoryBot.create(:to_do, user: user, climb: climb1) }

    it "deletes the to do join table record between user and climb " do
      prev_todo_count = ToDo.count
      prev_user_climb_count = user.climbs.count

      delete(:destroy, params: {:id => climb1.id} )

      expect(response.status).to eq(200)
      expect(ToDo.count).to eq(prev_todo_count - 1)
      expect(user.climbs.count).to eq(prev_user_climb_count - 1)
    end
  end
end
