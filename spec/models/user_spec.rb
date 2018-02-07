require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_one :to_do }
  it { should have_one :tick }
end
