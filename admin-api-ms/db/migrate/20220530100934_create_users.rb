class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :Users, if_not_exists: true do |t|
      t.string :email, null: false, index: { unique: true }
      t.string :password, null: false
      t.string :role, null: false
      t.boolean :isActivated, default: false
      t.string :google_id
      t.text :activationLink

      t.timestamps
    end
  end
end
