class CreateRoutes < ActiveRecord::Migration[5.1]
  def change
    create_table :routes do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.string :grade, null: false
      t.string :type, null: false
      t.integer :pitches, null: false
      t.text :description
      t.integer :rating
      t.text :comment
      t.decimal :longitude
      t.decimal :latitude
      t.belongs_to :tick
      t.belongs_to :project
      t.belongs_to :to_do

      t.timestamps
    end
  end
end
