require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password 'password'
    password_confirmation 'password'
  end

  factory :to_do do
    status 0
    association :user
    association :climb
  end

  factory :climb do
    name "Moonlight Buttress"
    location "Zion National Park"
    grade "5.12+"
    discipline "Trad"
    pitches 10
  end

  factory :comment do
    body "Maybe one day"
    association :user
    association :climb
  end
end
