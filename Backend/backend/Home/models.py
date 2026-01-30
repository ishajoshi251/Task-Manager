from django.db import models
from django.contrib.auth.hashers import make_password, check_password
# Create your models here.
class User(models.Model):
    user_id=models.AutoField(primary_key=True)
    user_name=models.CharField(max_length=32,unique=True)
    first_name=models.CharField(max_length=32)
    last_name=models.CharField(max_length=32)
    password=models.CharField(max_length=4096)
    user_email=models.CharField(max_length=32)    
    def save(self, *args, **kwargs):
        # Check if the password is not already hashed
        if not self.password.startswith(('pbkdf2_sha256$', 'bcrypt$', 'argon2$')):
            # Hash the password before saving
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

class Board(models.Model):
    board_id=models.AutoField(primary_key=True)
    board_name=models.CharField(max_length=32)

class Task(models.Model):
    task_id=models.AutoField(primary_key=True)
    task_name=models.CharField(max_length=32)
    task_desc=models.TextField(max_length=128)
    time_stamp=models.DateTimeField(auto_now_add=True)
    task_status=models.CharField(max_length=16)
    board=models.ForeignKey(Board,on_delete=models.CASCADE,null=True)
    assigned_to=models.CharField(max_length=32,default='')

class BoardUser(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    board=models.ForeignKey(Board,on_delete=models.CASCADE,null=True)
