class ChangeMpIdNullFalse < ActiveRecord::Migration[5.1]
  def change
    change_column_null :climbs, :mp_route_id, true
  end
end
