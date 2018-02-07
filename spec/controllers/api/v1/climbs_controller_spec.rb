require "rails_helper"

RSpec.describe Api::V1::ClimbsController, type: :controller do
  let!(:user) { FactoryBot.create(:user)}
  let!(:to_do_list) { FactoryBot.create(:to_do, user: user) }
  let!(:tick_list) { FactoryBot.create(:tick, user: user) }

  before(:each) do
    FactoryBot.create(:climb, to_do: to_do_list)
    FactoryBot.create(:climb, name: "Sheer Lunacy", to_do: to_do_list)
    FactoryBot.create(:climb, name: "Astroman", location: "Yosemite National Park", tick: tick_list)
    FactoryBot.create(:climb, name: "Rostrum", location: "Yosemite National Park", tick: tick_list)
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
      post(:create, params: new_post)
      expect(Climb.count).to eq(prev_count + 1)
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
