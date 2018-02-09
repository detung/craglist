require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
  end

  factory :to_do do
    association :user
    association :climb
  end

  factory :climb do
    name "Moonlight Buttress"
    location "Zion National Park"
    grade "5.12+"
    discipline "Trad"
    pitches 10
    description "This is a cool rock climb"
    comment "Maybe one day"
  end
end
