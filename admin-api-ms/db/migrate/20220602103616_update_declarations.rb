class UpdateDeclarations < ActiveRecord::Migration[7.0]
  def change
    change_column :Declarations, :status, :string, default: 'REQUESTED'
  end
end
