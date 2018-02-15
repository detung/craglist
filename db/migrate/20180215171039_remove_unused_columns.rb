class RemoveUnusedColumns < ActiveRecord::Migration[5.1]
  def change
    remove_column :climbs, :description, :text
    remove_column :climbs, :rating, :integer
  end
end
