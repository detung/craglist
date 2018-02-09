class AddCompletedColumnToDo < ActiveRecord::Migration[5.1]
  def change
    add_column :to_dos, :completed, :boolean, default: false, null: false
  end
end
