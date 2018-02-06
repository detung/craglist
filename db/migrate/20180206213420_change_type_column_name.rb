class ChangeTypeColumnName < ActiveRecord::Migration[5.1]
  def change
    rename_column(:climbs, :type, :discipline)
  end
end
