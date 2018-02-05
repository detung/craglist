class AddColumnToClimbsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :climbs, :mp_route_id, :integer, null: false
  end
end
