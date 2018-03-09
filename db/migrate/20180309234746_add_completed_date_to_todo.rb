class AddCompletedDateToTodo < ActiveRecord::Migration[5.1]
  def change
    add_column :to_dos, :completed_date, :datetime
  end
end
