class ChangeRoutesToClimbs < ActiveRecord::Migration[5.1]
  def change
    rename_table :routes, :climbs
  end
end
