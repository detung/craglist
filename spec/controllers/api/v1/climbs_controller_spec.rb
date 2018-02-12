require "rails_helper"

RSpec.describe Api::V1::ClimbsController, type: :controller do
  let!(:user) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user) }
  let!(:climb1) { FactoryBot.create(:climb) }
  let!(:climb2) { FactoryBot.create(:climb, name: "Sheer Lunacy") }
  let!(:climb3) { FactoryBot.create(:climb, name: "Astroman", location: "Yosemite National Park") }
  let!(:climb4) { FactoryBot.create(:climb, name: "Rostrum", location: "Yosemite National Park") }

  before(:each) do
    user.climbs << climb1
    user.climbs << climb2
    user.climbs << climb3
    user.climbs << climb4
    ToDo.find_by(user: user, climb: climb3).completed!
    ToDo.find_by(user: user, climb: climb4).completed!

    user2.climbs << climb1
    user2.climbs << climb2

    FactoryBot.create(:comment, user: user, climb: climb1)
    FactoryBot.create(:comment, user: user, climb: climb4)
    FactoryBot.create(:comment, body: "Gotta practice my crack climb skills", user: user2, climb: climb1)

    sign_in user
  end

  describe "GET#todo" do
    it "should return a json of the climbs on the to do list" do
      get :todos
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq 2
      expect(returned_json[0]["climb"]["name"]).to eq "Moonlight Buttress"
      expect(returned_json[1]["climb"]["name"]).to eq "Sheer Lunacy"
      expect(returned_json[0]["comment"]["body"]).to eq "Maybe one day"
    end

    it "should return the user's comment for the climb" do
      sign_out user
      sign_in user2

      get :todos
      returned_json = JSON.parse(response.body)
      expect(returned_json[0]["comment"]["body"]).to eq "Gotta practice my crack climb skills"
      expect(returned_json[0]["comment"]["body"]).to_not eq "Maybe one day"
    end
  end

  describe "POST#create" do
    let(:new_post) {
      {
        climb: {
          name: "Biographie/Realization",
          location: "Ceuse, France",
          grade: "5.15a",
          discipline: "Sport",
          pitches: 1
        },
        comment: {
          body: "The classic elite testpiece"
        }
      }
    }

    it "creates a new Climb that is owned by the current user" do
      prev_count = Climb.count
      prev_user_climb_count = user.climbs.count
      prev_user2_climb_count = user2.climbs.count

      post(:create, params: new_post)

      expect(Climb.count).to eq(prev_count + 1)
      expect(user.climbs.count).to eq(prev_user_climb_count + 1)
      expect(user2.climbs.count).to eq(prev_user2_climb_count)
    end

    it "creates a new Comment that belongs to the user and the Climb" do
      prev_comment_count = Comment.count

      post(:create, params: new_post)

      new_climb = Climb.last
      new_comment = Comment.find_by(user: user, climb: new_climb)

      expect(Comment.count).to eq(prev_comment_count + 1)
      expect(new_comment.body).to eq("The classic elite testpiece")
    end

    it "doesn't create a new Climb if the user is not signed in" do
      sign_out user

      prev_count = Climb.count

      post(:create, params: new_post)

      expect(Climb.count).to eq(prev_count)
    end
  end

  describe "GET#tick" do
    it "should return a json of the climbs on the tick list" do
      get :ticks
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq 2
      expect(returned_json[0]["climb"]["name"]).to eq "Rostrum"
      expect(returned_json[1]["climb"]["name"]).to eq "Astroman"
      expect(returned_json[0]["comment"]["body"]).to eq "Maybe one day"
    end
  end
end
