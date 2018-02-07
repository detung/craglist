class RemoveProjectsId < ActiveRecord::Migration[5.1]
  def up
    remove_reference :climbs, :project
  end

  def down
    add_reference :climbs, :project
  end
end
