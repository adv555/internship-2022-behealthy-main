class Declarations < ActiveRecord::Migration[7.0]
  def change
    create_table :Declarations, if_not_exists: true do |t|
      t.string :status, null: false
      t.integer :patient_id, null: false
      t.integer :family_practitioner_id, null: false

      t.timestamps
    end

    add_foreign_key :Declarations, :family_practitioners, column: :family_practitioner_id, on_delete: :cascade
    add_foreign_key :Declarations, :patients, column: :patient_id, on_delete: :cascade
  end
end
