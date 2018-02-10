require "rails_helper"

RSpec.describe Api::V1::ClimbsController, type: :controller do
  let!(:user) { FactoryBot.create(:user)}
  let!(:climb1) { FactoryBot.create(:climb) }
  let!(:climb2) { FactoryBot.create(:climb, name: "Sheer Lunacy") }
  let!(:climb3) { FactoryBot.create(:climb, name: "Astroman", location: "Yosemite National Park") }
  let!(:climb4) { FactoryBot.create(:climb, name: "Rostrum", location: "Yosemite National Park") }

  before(:each) do
    FactoryBot.create(:to_do, user: user, climb: climb1)
    FactoryBot.create(:to_do, user: user, climb: climb2)
    FactoryBot.create(:to_do, user: user, climb: climb3, status: "completed")
    FactoryBot.create(:to_do, user: user, climb: climb4, status: "completed")
  end

  describe "GET#todo" do
    it "should return a json of the climbs on the to do list" do

      get :todos
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq 2
      expect(returned_json[0]["name"]).to eq "Moonlight Buttress"
      expect(returned_json[1]["name"]).to eq "Sheer Lunacy"
    end
  end

  describe "POST#create" do
    it "creates a new Climb" do
      new_post = {
        climb: {
          name: "Biographie/Realization",
          location: "Ceuse, France",
          grade: "5.15a",
          discipline: "Sport",
          pitches: 1
        }
      }

      prev_count = Climb.count
      prev_user_climb_count = user.climbs.count

      post(:create, params: new_post)

      expect(Climb.count).to eq(prev_count + 1)
      expect(user.climbs.count).to eq(prev_user_climb_count + 1)
    end
  end

  describe "GET#tick" do
    it "should return a json of the climbs on the tick list" do

      get :ticks
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq 2
      expect(returned_json[0]["name"]).to eq "Rostrum"
      expect(returned_json[1]["name"]).to eq "Astroman"
    end
  end
end
