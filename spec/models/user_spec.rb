require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_many :to_dos }
  it { should have_many(:climbs).through(:to_dos) }
end
