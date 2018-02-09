require 'rails_helper'

RSpec.describe ToDo, type: :model do
  it { should belong_to :user }
  it { should belong_to :climb }
end
