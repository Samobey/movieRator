# Generated by Django 2.2.4 on 2019-08-04 01:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_movie_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='image',
            field=models.FileField(blank=True, default='/random.jpg', null=True, upload_to=''),
        ),
    ]
