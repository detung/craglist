class ChangeTodoClimbAssociation < ActiveRecord::Migration[5.1]
  def up
    remove_reference :climbs, :to_do
  end

  def down
    add_reference :climbs, :to_do
  end
end
