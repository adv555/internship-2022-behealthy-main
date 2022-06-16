class CreatePatient < ActiveRecord::Migration[7.0]
  def change
    create_table :patients, if_not_exists: true do |t|
      t.string :first_name, null: false, :limit => 64
      t.string :last_name, null: false, :limit => 64 
      t.string :gender, null: false
      t.string :address, null: false
      t.string :phone, null: false, :limit => 50
      t.datetime :birthdate, null: false
      t.integer :user_id, null: false, index: { unique: true }

      t.timestamps
    end

    add_foreign_key :patients, :Users, column: :user_id, on_delete: :cascade
  end
end
