class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :to_dos do |t|
      t.belongs_to :user
    end
  end
end
