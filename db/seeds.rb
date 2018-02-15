# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if Rails.env.development?
  user = User.find_or_create_by!(email: "detung@gmail.com") do |user|
    user.password = "password"
  end

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
  Comment.find_or_create_by!(body: "Proud of this lead", user: user, climb: peer_pressure)
  Comment.find_or_create_by!(body: "First 5.10a onsight", user: user, climb: underdog)
  Comment.find_or_create_by!(body: "Really fun climb on juggy holds", user: user, climb: metamorphosis)
  Comment.find_or_create_by!(body: "Steep beginning and interesting stem finish", user: user, climb: masterpiece)
  Comment.find_or_create_by!(body: "First lead at Rumney", user: user, climb: glory_jeans)
  Comment.find_or_create_by!(body: "Amazing big wall", user: user, climb: epinephrine)
  Comment.find_or_create_by!(body: "Maybe first trad with Fletcher", user: user, climb: thin_air)
  Comment.find_or_create_by!(body: "Half Dome is epic", user: user, climb: snake_dike)
  Comment.find_or_create_by!(body: "Looks really cool", user: user, climb: whitney_gilman)

  climbs_ticked = []
  climbs_ticked << ToDo.find_by(user: user, climb: peer_pressure)
  climbs_ticked << ToDo.find_by(user: user, climb: underdog)
  climbs_ticked << ToDo.find_by(user: user, climb: metamorphosis)
  climbs_ticked << ToDo.find_by(user: user, climb: masterpiece)
  climbs_ticked << ToDo.find_by(user: user, climb: glory_jeans)
  climbs_ticked.each do |climb|
    climb.completed!
  end
end
