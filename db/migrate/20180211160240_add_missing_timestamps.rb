class AddMissingTimestamps < ActiveRecord::Migration[5.1]
  def change
    add_timestamps :to_dos
  end
end
