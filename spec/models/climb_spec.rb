require 'rails_helper'

RSpec.describe Climb, type: :model do
  it { should have_many :to_dos }
  it { should have_many(:users).through(:to_dos) }
  it { should have_many :comments }
end
