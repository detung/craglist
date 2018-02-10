class AddCompletedColumnToDo < ActiveRecord::Migration[5.1]
  def change
    add_column :to_dos, :status, :integer, default: 0
  end
end
