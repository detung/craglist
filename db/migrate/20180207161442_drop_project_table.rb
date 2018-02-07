class DropProjectTable < ActiveRecord::Migration[5.1]
  def up
    drop_table :projects
  end

  def down
    create_table :projects do |t|
      t.belongs_to :user
    end
  end
end
