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

  todo_list = ToDo.find_or_create_by!(user: user)
  tick_list = Tick.find_or_create_by!(user: user)

  Climb.find_or_create_by!(
    to_do: todo_list,
    name: "Clusterphobia",
    location: "Rumney, NH",
    grade: "5.10d",
    discipline: "Sport",
    pitches: 1,
    description: "A fun slightly steep climb",
    comment: "Want to lead this one"
  )
  Climb.find_or_create_by!(
    to_do: todo_list,
    name: "Orangahang",
    location: "Rumney, NH",
    grade: "5.12a",
    discipline: "Sport",
    pitches: 1,
    description: "Steep powerful climbing on jugs",
    comment: "Maybe my first 5.12a?"
  )
  Climb.find_or_create_by!(
    tick: tick_list,
    name: "Peer Pressure",
    location: "Rumney, NH",
    grade: "5.10d",
    discipline: "Sport",
    pitches: 1,
    description: "Big rest in the middle",
    comment: "Proud of this lead"
  )
  Climb.find_or_create_by!(
    tick: tick_list,
    name: "Underdog",
    location: "Rumney, NH",
    grade: "5.10a",
    discipline: "Sport",
    pitches: 1,
    description: "Fun. Unique hold",
    comment: "First 5.10a onsight"
  )

end
