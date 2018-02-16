# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
test_user = User.find_or_create_by!(email: "dennis@gmail.com") do |user|
  user.password = "password"
end

user = User.find_by(email: "detung@gmail.com")

clusterphobia = Climb.find_or_create_by!(
  name: "Clusterphobia",
  location: "Rumney, NH",
  grade: "5.10d",
  discipline: "Sport",
  pitches: 1
)
orangahang = Climb.find_or_create_by!(
  name: "Orangahang",
  location: "Rumney, NH",
  grade: "5.12a",
  discipline: "Sport",
  pitches: 1
)
peer_pressure = Climb.find_or_create_by!(
  name: "Peer Pressure",
  location: "Rumney, NH",
  grade: "5.10d",
  discipline: "Sport",
  pitches: 1
)
underdog = Climb.find_or_create_by!(
  name: "Underdog",
  location: "Rumney, NH",
  grade: "5.10a",
  discipline: "Sport",
  pitches: 1
)
metamorphosis = Climb.find_or_create_by!(
  name: "Metamorphosis",
  location: "Rumney, NH",
  grade: "5.8",
  discipline: "Sport",
  pitches: 1
)
masterpiece = Climb.find_or_create_by!(
  name: "Masterpiece",
  location: "Rumney, NH",
  grade: "5.10a",
  discipline: "Sport",
  pitches: 1
)
glory_jeans = Climb.find_or_create_by!(
  name: "Glory Jeans",
  location: "Rumney, NH",
  grade: "5.7",
  discipline: "Sport",
  pitches: 1
)
epinephrine = Climb.find_or_create_by!(
  name: "Epinephrine",
  location: "Red Rock, NV",
  grade: "5.9",
  discipline: "Trad",
  pitches: 13
)
thin_air = Climb.find_or_create_by!(
  name: "Thin Air",
  location: "Cathedral Ledge, NH",
  grade: "5.6",
  discipline: "Trad",
  pitches: 4
)
snake_dike = Climb.find_or_create_by!(
  name: "Snake Dike",
  location: "Yosemite, CA",
  grade: "5.7",
  discipline: "Trad",
  pitches: 8
)
whitney_gilman = Climb.find_or_create_by!(
  name: "Whitney Gilman Ridge",
  location: "Cannon Cliff, NH",
  grade: "5.7",
  discipline: "Trad",
  pitches: 5
)

user.climbs = Climb.all

Comment.find_or_create_by!(body: "Want to lead this one", user: user, climb: clusterphobia)
Comment.find_or_create_by!(body: "Maybe my first 5.12a?", user: user, climb: orangahang)
Comment.find_or_create_by!(body: "Proud of this send", user: user, climb: peer_pressure)
Comment.find_or_create_by!(body: "First 5.10a onsight", user: user, climb: underdog)
Comment.find_or_create_by!(body: "Really fun climb on juggy holds", user: user, climb: metamorphosis)
Comment.find_or_create_by!(body: "Steep beginning and interesting stem finish", user: user, climb: masterpiece)
Comment.find_or_create_by!(body: "First lead at Rumney", user: user, climb: glory_jeans)
Comment.find_or_create_by!(body: "Amazing big wall", user: user, climb: epinephrine)
Comment.find_or_create_by!(body: "Summer goal. First multipitch trad!", user: user, climb: thin_air)
Comment.find_or_create_by!(body: "Would be so epic to climb Half Dome", user: user, climb: snake_dike)
Comment.find_or_create_by!(body: "Future trad goal", user: user, climb: whitney_gilman)

def populate_tick_list(climber)
  climbs_ticked = []
  climbs_ticked << ToDo.find_by(user: climber, climb: peer_pressure)
  climbs_ticked << ToDo.find_by(user: climber, climb: underdog)
  climbs_ticked << ToDo.find_by(user: climber, climb: metamorphosis)
  climbs_ticked << ToDo.find_by(user: climber, climb: masterpiece)
  climbs_ticked << ToDo.find_by(user: climber, climb: glory_jeans)
  climbs_ticked.each do |climb|
    climb.completed!
  end
end

test_user.climbs = Climb.all
Comment.find_or_create_by!(body: "Want to lead this one", user: test_user, climb: clusterphobia)
Comment.find_or_create_by!(body: "Maybe my first 5.12a?", user: test_user, climb: orangahang)
Comment.find_or_create_by!(body: "Proud of this send", user: test_user, climb: peer_pressure)
Comment.find_or_create_by!(body: "First 5.10a onsight", user: test_user, climb: underdog)
Comment.find_or_create_by!(body: "Really fun climb on juggy holds", user: test_user, climb: metamorphosis)
Comment.find_or_create_by!(body: "Steep beginning and interesting stem finish", user: test_user, climb: masterpiece)

populate_tick_list(user)
populate_tick_list(test_user)
