class PdfDeclarations < ActiveRecord::Migration[7.0]
  def change
    add_column :Declarations, :pdf, :string
  end
end
