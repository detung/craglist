class AddClimbIdToDo < ActiveRecord::Migration[5.1]
  def change
    add_reference :to_dos, :climb
  end
end
