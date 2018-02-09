class RemoveTicksRelation < ActiveRecord::Migration[5.1]
  def up
    drop_table :ticks

    remove_reference :climbs, :tick
  end

  def down
    create_table :ticks do |t|
      t.belongs_to :user
    end
  end
end
