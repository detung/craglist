require "rails_helper"

RSpec.describe Api::V1::ToDosController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:climb1) { FactoryBot.create(:climb) }
  let!(:climb2) { FactoryBot.create(:climb, name: "Astroman") }
  let!(:climb3) { FactoryBot.create(:climb, name: "Rostrum") }
  let!(:climb4) { FactoryBot.create(:climb, name: "Serenity Sons") }

  before(:each) do
    user.climbs << climb1
    user.climbs << climb2
    user.climbs << climb3
    user.climbs << climb4
    ToDo.find_by(user: user, climb: climb3).completed!
    ToDo.find_by(user: user, climb: climb4).completed!

    sign_in user
  end

  describe "DELETE #destroy" do
    it "deletes the to do join table record between user and climb and returns the to do list in json" do
      prev_todo_count = ToDo.where(status: "pending").count
      prev_user_climb_count = user.climbs.count

      delete(:destroy, params: {:id => climb1.id} )

      expect(ToDo.where(status: "pending").count).to eq(prev_todo_count - 1)
      expect(user.climbs.count).to eq(prev_user_climb_count - 1)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(returned_json[0]["climb"]["name"]).to eq "Astroman"
    end

    it "deletes the to do join table record between user and climb and returns the tick list in json" do
      prev_tick_count = ToDo.where(status: "completed").count
      prev_user_climb_count = user.climbs.count

      delete(:destroy, params: {:id => climb3.id} )

      expect(ToDo.where(status: "completed").count).to eq(prev_tick_count - 1)
      expect(user.climbs.count).to eq(prev_user_climb_count - 1)

      returned_json = JSON.parse(response.body)
      expect(response.status).to eq(200)
      expect(returned_json[0]["climb"]["name"]).to eq "Serenity Sons"
    end
  end
end
