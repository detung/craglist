require "rails_helper"

RSpec.describe Api::V1::ClimbsController, type: :controller do
  let(:to_do_list) { FactoryBot.create(:to_do) }
  before(:each) do
    FactoryBot.create(:climb, to_do: to_do_list)
    FactoryBot.create(:climb, name: "Sheer Lunacy", to_do: to_do_list)
  end

  describe "GET#todo" do
    it "should return a json of the climbs on the to do list" do

      get :todo
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
      post_json = {
        name: "Biographie/Realization",
        location: "Ceuse, France",
        grade: "5.15a",
        discipline: "Sport",
        pitches: 1
      }

      prev_count = Climb.count
      post(:create, body: post_json)
      expect(Climb.count).to eq(prev_count + 1)
    end
  end
end
