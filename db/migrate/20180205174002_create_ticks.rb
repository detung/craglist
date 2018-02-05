class CreateTicks < ActiveRecord::Migration[5.1]
  def change
    create_table :ticks do |t|
      t.belongs_to :user
    end
  end
end
