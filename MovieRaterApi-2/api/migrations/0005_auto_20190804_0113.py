# Generated by Django 2.2.4 on 2019-08-04 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20190804_0110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movie',
            name='image',
            field=models.FileField(blank=True, default='media/cq5dam.tinypng.1440.auto.jpg', null=True, upload_to=''),
        ),
    ]
