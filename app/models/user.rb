class User < ApplicationRecord
  has_secure_password
  has_many :lists

  validates :email, presence: true, uniqueness: true
  
  validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
end
