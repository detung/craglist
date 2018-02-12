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

  climb1 = Climb.find_or_create_by!(
    name: "Clusterphobia",
    location: "Rumney, NH",
    grade: "5.10d",
    discipline: "Sport",
    pitches: 1,
    description: "A fun slightly steep climb"
  )
  climb2 = Climb.find_or_create_by!(
    name: "Orangahang",
    location: "Rumney, NH",
    grade: "5.12a",
    discipline: "Sport",
    pitches: 1,
    description: "Steep powerful climbing on jugs"
  )
  climb3 = Climb.find_or_create_by!(
    name: "Peer Pressure",
    location: "Rumney, NH",
    grade: "5.10d",
    discipline: "Sport",
    pitches: 1,
    description: "Big rest in the middle"
  )
  climb4 = Climb.find_or_create_by!(
    name: "Underdog",
    location: "Rumney, NH",
    grade: "5.10a",
    discipline: "Sport",
    pitches: 1,
    description: "Fun. Unique hold"
  )

  user.climbs = Climb.all

  Comment.find_or_create_by!(body: "Want to lead this one", user: user, climb: climb1)
  Comment.find_or_create_by!(body: "Maybe my first 5.12a?", user: user, climb: climb2)
  Comment.find_or_create_by!(body: "Proud of this lead", user: user, climb: climb3)
  Comment.find_or_create_by!(body: "First 5.10a onsight", user: user, climb: climb4)
  
  tick1 = ToDo.find_by(user: user, climb: Climb.third)
  tick1.completed!
  tick2 = ToDo.find_by(user: user, climb: Climb.last)
  tick2.completed!
end
