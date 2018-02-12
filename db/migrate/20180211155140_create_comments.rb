class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.text :body
      t.belongs_to :user
      t.belongs_to :climb

      t.timestamps
    end

    remove_column :climbs, :comment, :text
  end
end
