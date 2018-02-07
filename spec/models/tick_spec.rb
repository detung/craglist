require 'rails_helper'

RSpec.describe Tick, type: :model do
  it { should belong_to :user }
  it { should have_many :climbs }
end
